import clsx from 'clsx';

export function Grid({
  as: Component = 'div',
  className,
  flow = 'row',
  gap = 'default',
  items = 4,
  layout = 'default',
  ...props
}: {
  as?: React.ElementType;
  className?: string;
  flow?: 'row' | 'col';
  gap?: 'default' | 'blog';
  items?: number;
  layout?: 'default' | 'products' | 'auto' | 'blog';
  [key: string]: any;
}) {
  const layouts = {
    default: `grid-cols-1 ${items === 2 && 'md:grid-cols-2'}  ${
      items === 3 && 'sm:grid-cols-3'
    } ${items > 3 && 'md:grid-cols-3'} ${items >= 4 && 'lg:grid-cols-4'}`,
    products: `grid-cols-2 ${items >= 3 && 'md:grid-cols-3'} ${
      items >= 4 && 'lg:grid-cols-4'
    }`,
    auto: 'auto-cols-auto',
    blog: 'grid-cols-1 md:grid-cols-2',
  };
  const gaps = {
    default: 'grid gap-x-3 md:gap-x-6 xl:gap-x-8 gap-y-8',
    blog: 'grid gap-6',
  };

  const flows = {
    row: 'grid-flow-row',
    col: 'grid-flow-col',
  };

  const styles = clsx(flows[flow], gaps[gap], layouts[layout], className);

  return <Component {...props} className={styles} />;
}
