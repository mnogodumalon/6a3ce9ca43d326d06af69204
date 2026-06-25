import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Schuldnerverwaltung, Forderungserfassung, Ueberzahlungsbearbeitung } from '@/types/app';
import { LivingAppsService } from '@/services/livingAppsService';

export function useDashboardData() {
  const [schuldnerverwaltung, setSchuldnerverwaltung] = useState<Schuldnerverwaltung[]>([]);
  const [forderungserfassung, setForderungserfassung] = useState<Forderungserfassung[]>([]);
  const [ueberzahlungsbearbeitung, setUeberzahlungsbearbeitung] = useState<Ueberzahlungsbearbeitung[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAll = useCallback(async () => {
    setError(null);
    try {
      const [schuldnerverwaltungData, forderungserfassungData, ueberzahlungsbearbeitungData] = await Promise.all([
        LivingAppsService.getSchuldnerverwaltung(),
        LivingAppsService.getForderungserfassung(),
        LivingAppsService.getUeberzahlungsbearbeitung(),
      ]);
      setSchuldnerverwaltung(schuldnerverwaltungData);
      setForderungserfassung(forderungserfassungData);
      setUeberzahlungsbearbeitung(ueberzahlungsbearbeitungData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Fehler beim Laden der Daten'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // Silent background refresh (no loading state change → no flicker)
  useEffect(() => {
    async function silentRefresh() {
      try {
        const [schuldnerverwaltungData, forderungserfassungData, ueberzahlungsbearbeitungData] = await Promise.all([
          LivingAppsService.getSchuldnerverwaltung(),
          LivingAppsService.getForderungserfassung(),
          LivingAppsService.getUeberzahlungsbearbeitung(),
        ]);
        setSchuldnerverwaltung(schuldnerverwaltungData);
        setForderungserfassung(forderungserfassungData);
        setUeberzahlungsbearbeitung(ueberzahlungsbearbeitungData);
      } catch {
        // silently ignore — stale data is better than no data
      }
    }
    function handleRefresh() { void silentRefresh(); }
    window.addEventListener('dashboard-refresh', handleRefresh);
    return () => window.removeEventListener('dashboard-refresh', handleRefresh);
  }, []);

  const schuldnerverwaltungMap = useMemo(() => {
    const m = new Map<string, Schuldnerverwaltung>();
    schuldnerverwaltung.forEach(r => m.set(r.record_id, r));
    return m;
  }, [schuldnerverwaltung]);

  const forderungserfassungMap = useMemo(() => {
    const m = new Map<string, Forderungserfassung>();
    forderungserfassung.forEach(r => m.set(r.record_id, r));
    return m;
  }, [forderungserfassung]);

  return { schuldnerverwaltung, setSchuldnerverwaltung, forderungserfassung, setForderungserfassung, ueberzahlungsbearbeitung, setUeberzahlungsbearbeitung, loading, error, fetchAll, schuldnerverwaltungMap, forderungserfassungMap };
}