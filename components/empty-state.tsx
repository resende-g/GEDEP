import Link from "next/link";

type EmptyStateProps = {
  title?: string;
  description?: string;
  href?: string;
  action?: string;
};

export function EmptyState({
  title = "Conteúdo em construção.",
  description,
  href,
  action,
}: EmptyStateProps) {
  return (
    <div className="empty-state" role="status">
      <span aria-hidden="true">§</span>
      <div>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
        {href && action ? <Link href={href} className="text-link">{action} →</Link> : null}
      </div>
    </div>
  );
}
