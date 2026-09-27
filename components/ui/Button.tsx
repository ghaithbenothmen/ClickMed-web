import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "lime" | "outline-light";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-btn font-semibold whitespace-nowrap " +
  "transition-[background-color,border-color,box-shadow,filter,transform,color] duration-200 ease-out-soft " +
  "active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-deep text-white shadow-deep hover:brightness-125 hover:-translate-y-px focus-visible:outline-logo",
  secondary:
    "bg-white text-deep border border-line hover:border-deep hover:-translate-y-px focus-visible:outline-logo",
  lime: "bg-lime text-ink shadow-[0_10px_30px_-12px_rgba(200,224,74,0.7)] hover:brightness-105 hover:-translate-y-px focus-visible:outline-lime",
  "outline-light":
    "border border-white/25 text-white hover:border-lime hover:-translate-y-px focus-visible:outline-lime",
};

const sizes = {
  md: "h-11 px-5 text-[15px]",
  lg: "h-13 px-6 text-[15px] sm:h-14 sm:px-7",
} as const;

type CommonProps = {
  variant?: Variant;
  size?: keyof typeof sizes;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type ButtonAsButton = CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (rest.href !== undefined) {
    return (
      <a className={classes} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }
  return (
    <button
      type="button"
      className={classes}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
