import type { KpiCardData } from "../data/companyData";

export function KpiCard({ item }: { item: KpiCardData }) {
  const Icon = item.icon;
  return (
    <article className={`kpi-card tone-${item.tone}`}>
      <span className="kpi-title">{item.title}</span>
      <div className="kpi-body">
        <span className="kpi-icon">
          <Icon size={28} />
        </span>
        <span>
          <strong>{item.value}</strong>
          <small>{item.detail}</small>
        </span>
      </div>
    </article>
  );
}
