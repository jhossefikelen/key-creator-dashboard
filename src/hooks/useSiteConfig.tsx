import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_SITE_CONFIG, type SiteConfig } from "@/lib/site-config";
import {
  fetchSiteConfig,
  readCachedSiteConfig,
  SITE_CONFIG_UPDATED_EVENT,
} from "@/lib/site-config-api";

const SiteConfigContext = createContext<SiteConfig>(DEFAULT_SITE_CONFIG);

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);

  useEffect(() => {
    setConfig(readCachedSiteConfig());
    let mounted = true;
    const handleUpdate = (event: Event) => {
      const updated = (event as CustomEvent<SiteConfig>).detail;
      if (updated) setConfig(updated);
    };
    const handleStorage = () => setConfig(readCachedSiteConfig());
    window.addEventListener(SITE_CONFIG_UPDATED_EVENT, handleUpdate);
    window.addEventListener("storage", handleStorage);
    void fetchSiteConfig().then((loaded) => {
      if (mounted) setConfig(loaded);
    });
    return () => {
      mounted = false;
      window.removeEventListener(SITE_CONFIG_UPDATED_EVENT, handleUpdate);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const value = useMemo(() => config, [config]);
  return <SiteConfigContext.Provider value={value}>{children}</SiteConfigContext.Provider>;
}

export function useSiteConfig() {
  return useContext(SiteConfigContext);
}
