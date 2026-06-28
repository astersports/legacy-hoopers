import { useEffect, useState } from "react";
import { getProgramRecords, type TeamRecord } from "@/lib/aster";

interface State {
  records: TeamRecord[];
  loading: boolean;
  error: string | null;
}

/**
 * Loads every Aster team's published records from the Aster platform.
 * Read-only public data; no auth. Shared by Home + Records.
 */
export function useProgramRecords(): State {
  const [state, setState] = useState<State>({ records: [], loading: true, error: null });

  useEffect(() => {
    let alive = true;
    getProgramRecords()
      .then((records) => alive && setState({ records, loading: false, error: null }))
      .catch((e) =>
        alive && setState({ records: [], loading: false, error: (e as Error).message ?? "Failed to load" }),
      );
    return () => {
      alive = false;
    };
  }, []);

  return state;
}
