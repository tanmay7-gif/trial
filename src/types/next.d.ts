declare module 'next' {
  export type Metadata = {
    title?: string | { default: string; template: string };
    description?: string;
    icons?: any;
    manifest?: string;
    [key: string]: any;
  };
  export type ResolvingMetadata = Promise<any>;
  export type ResolvingViewport = Promise<any>;
  export type NextConfig = Record<string, any>;
  const next: any;
  export default next;
}

declare module 'next/types.js' {
  export type ResolvingMetadata = Promise<any>;
  export type ResolvingViewport = Promise<any>;
}

declare module 'next/font/google' {
  export const Geist: any;
  export const Geist_Mono: any;
  export const Inter: any;
  export const Outfit: any;
}

declare module 'next/image' {
  import React from 'react';
  const Image: React.FC<any>;
  export default Image;
}

declare module 'next/link' {
  import React from 'react';
  const Link: React.FC<any>;
  export default Link;
}

declare module 'next/navigation' {
  export const useRouter: () => {
    push: (url: string) => void;
    replace: (url: string) => void;
    refresh: () => void;
    back: () => void;
    forward: () => void;
  };
  export const usePathname: () => string;
  export const useSearchParams: () => URLSearchParams;
}

declare module 'next/server' {
  export class NextResponse {
    static json(body: any, init?: { status?: number; statusText?: string; headers?: Record<string, string> }): any;
    static redirect(url: string | URL, status?: number): any;
    static next(): any;
  }
  export class NextRequest {
    url: string;
    method: string;
    json(): Promise<any>;
  }
}

declare module 'lucide-react' {
  import React from 'react';
  export const ShieldCheck: React.FC<any>;
  export const User: React.FC<any>;
  export const Plus: React.FC<any>;
  export const Lock: React.FC<any>;
  export const Unlock: React.FC<any>;
  export const Sun: React.FC<any>;
  export const Moon: React.FC<any>;
  export const Upload: React.FC<any>;
  export const Globe: React.FC<any>;
  export const Trash2: React.FC<any>;
  export const AlertCircle: React.FC<any>;
  export const Fingerprint: React.FC<any>;
  export const Delete: React.FC<any>;
  export const ShieldAlert: React.FC<any>;
  export const X: React.FC<any>;
  export const UserPlus: React.FC<any>;
  export const Users: React.FC<any>;
  export const HeartPulse: React.FC<any>;
  export const Camera: React.FC<any>;
  export const FileText: React.FC<any>;
  export const CheckCircle2: React.FC<any>;
  export const AlertTriangle: React.FC<any>;
  export const Sparkles: React.FC<any>;
  export const ArrowRight: React.FC<any>;
  export const RefreshCw: React.FC<any>;
  export const Calendar: React.FC<any>;
  export const Building2: React.FC<any>;
  export const Tag: React.FC<any>;
  export const Download: React.FC<any>;
  export const Share2: React.FC<any>;
  export const Clock: React.FC<any>;
  export const Check: React.FC<any>;
  export const Eye: React.FC<any>;
  export const RotateCcw: React.FC<any>;
  export const Search: React.FC<any>;
  export const Filter: React.FC<any>;
  export const ArrowUpDown: React.FC<any>;
  export const Activity: React.FC<any>;
  export const Heart: React.FC<any>;
  export const Droplets: React.FC<any>;
  export const TrendingDown: React.FC<any>;
  export const TrendingUp: React.FC<any>;
  export const Utensils: React.FC<any>;
  export const Bell: React.FC<any>;
  export const ShoppingCart: React.FC<any>;
  export const ChevronRight: React.FC<any>;
  export const Flame: React.FC<any>;
  export const Info: React.FC<any>;
  export const Layers: React.FC<any>;
  export const Mail: React.FC<any>;
  export const MessageSquare: React.FC<any>;
  export const FileCheck: React.FC<any>;
  export const History: React.FC<any>;
  export const Key: React.FC<any>;
  export const Database: React.FC<any>;
  export const ExternalLink: React.FC<any>;
  export const LayoutDashboard: React.FC<any>;
  export const FolderArchive: React.FC<any>;
  export const LogOut: React.FC<any>;
  export const EyeOff: React.FC<any>;
  export const Loader2: React.FC<any>;
  export const Shield: React.FC<any>;
  export const Home: React.FC<any>;
  const allIcons: Record<string, React.FC<any>>;
  export default allIcons;
}
