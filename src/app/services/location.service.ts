import { Injectable, signal } from '@angular/core';

export interface Region {
  code: string;
  name: string;
}

export interface Province {
  code: string;
  name: string;
  regionCode: string;
}

export interface City {
  code: string;
  name: string;
  provinceCode: string;
}

export interface DetectedLocation {
  city: string;
  region: string;
  zip: string;
  country: string;
}

@Injectable({ providedIn: 'root' })
export class LocationService {

  private _regions   = signal<Region[]>([]);
  private _provinces = signal<Province[]>([]);
  private _cities    = signal<City[]>([]);
  private _loading   = signal<boolean>(false);

  readonly regions   = this._regions.asReadonly();
  readonly provinces = this._provinces.asReadonly();
  readonly cities    = this._cities.asReadonly();
  readonly loading   = this._loading.asReadonly();

  // ── Browser GPS → reverse geocode via nominatim ───────────
  // Uses browser built-in GPS first, then converts
  // coordinates to city/region using OpenStreetMap Nominatim
  // (completely free, no API key needed)
  async detectLocation(): Promise<DetectedLocation | null> {
    return new Promise((resolve) => {

      // Check if browser supports geolocation
      if (!navigator.geolocation) {
        console.warn('Geolocation not supported');
        resolve(null);
        return;
      }

      // Ask browser for GPS coordinates
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          console.log('GPS coordinates:', lat, lng);

          try {
            // Use OpenStreetMap Nominatim to reverse geocode
            // (free, no key, works everywhere)
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
              {
                headers: {
                  'Accept-Language': 'en',
                  'User-Agent': 'StepUpApp/1.0'
                }
              }
            );
            const data = await res.json();
            console.log('Nominatim response:', data);

            const address = data.address ?? {};

            resolve({
              city:    address.city
                    ?? address.town
                    ?? address.municipality
                    ?? address.county
                    ?? '',
              region:  address.state    ?? '',
              zip:     address.postcode ?? '',
              country: address.country_code?.toUpperCase() ?? '',
            });

          } catch (e) {
            console.warn('Nominatim reverse geocode failed:', e);
            resolve(null);
          }
        },

        // User denied location or error
        (error) => {
          console.warn('Geolocation error:', error.message);
          resolve(null);
        },

        // Options
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  }

  // ── PSGC — load all regions ───────────────────────────────
  async loadRegions(): Promise<void> {
    if (this._regions().length > 0) return;
    this._loading.set(true);
    try {
      const res  = await fetch('https://psgc.cloud/api/regions');
      const data = await res.json();
      const mapped: Region[] = (data as any[]).map(r => ({
        code: String(r.code),
        name: String(r.name),
      }));
      mapped.sort((a, b) => a.name.localeCompare(b.name));
      this._regions.set(mapped);
    } catch (e) {
      console.error('Failed to load regions', e);
    } finally {
      this._loading.set(false);
    }
  }

  // ── PSGC — load provinces by region ──────────────────────
  async loadProvinces(regionCode: string): Promise<void> {
    this._provinces.set([]);
    this._cities.set([]);
    this._loading.set(true);
    try {
      const res  = await fetch(
        `https://psgc.cloud/api/regions/${regionCode}/provinces`
      );
      const data = await res.json();
      const mapped: Province[] = (data as any[]).map(p => ({
        code:       String(p.code),
        name:       String(p.name),
        regionCode: regionCode,
      }));
      mapped.sort((a, b) => a.name.localeCompare(b.name));
      this._provinces.set(mapped);
    } catch (e) {
      console.error('Failed to load provinces', e);
    } finally {
      this._loading.set(false);
    }
  }

  // ── PSGC — load cities by province ───────────────────────
  async loadCities(provinceCode: string): Promise<void> {
    this._cities.set([]);
    this._loading.set(true);
    try {
      const res  = await fetch(
        `https://psgc.cloud/api/provinces/${provinceCode}/cities-municipalities`
      );
      const data = await res.json();
      const mapped: City[] = (data as any[]).map(c => ({
        code:         String(c.code),
        name:         String(c.name),
        provinceCode: provinceCode,
      }));
      mapped.sort((a, b) => a.name.localeCompare(b.name));
      this._cities.set(mapped);
    } catch (e) {
      console.error('Failed to load cities', e);
    } finally {
      this._loading.set(false);
    }
  }

  // ── Find region by name ───────────────────────────────────
  findRegionByName(name: string): Region | undefined {
    const lower = name.toLowerCase();
    return this._regions().find(r =>
      r.name.toLowerCase().includes(lower) ||
      lower.includes(r.name.toLowerCase())
    );
  }

  // ── Find province by name ─────────────────────────────────
  findProvinceByName(name: string): Province | undefined {
    const lower = name.toLowerCase();
    return this._provinces().find(p =>
      p.name.toLowerCase().includes(lower) ||
      lower.includes(p.name.toLowerCase())
    );
  }
}