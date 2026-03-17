declare module "next" {
  export type Metadata = any;
}

declare module "next/link" {
  const Link: any;
  export default Link;
}

declare module "next/navigation" {
  export function useRouter(): {
    push: (href: string) => void;
  };
  export function usePathname(): string;
}

declare module "framer-motion" {
  export const motion: any;
  export const useMotionValue: any;
  export const useTransform: any;
}
