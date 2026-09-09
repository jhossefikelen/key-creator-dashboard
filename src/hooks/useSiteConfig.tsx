import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_SITE_CONFIG, type SiteConfig } from "@/lib/site-config";
import { fetchSiteConfig, readCachedSiteConfig } from "@/lib/site-config-api";

const SiteConfigContext = createContext<SiteConfig>(DEFAULT_SITE_CONFIG);

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);

  useEffect(() => {
    setConfig(readCachedSiteConfig());
    let mounted = true;
    void fetchSiteConfig().then((loaded) => {
      if (mounted) setConfig(loaded);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const value = useMemo(() => config, [config]);
  return <SiteConfigContext.Provider value={value}>{children}</SiteConfigContext.Provider>;
}

export function useSiteConfig() {
  return useContext(SiteConfigContext);
}
