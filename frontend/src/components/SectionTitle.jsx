const SectionTitle = ({ title, subtitle }) => (
  <div className="section-title-wrap">
    <h2 className="section-title">{title}</h2>
    {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
  </div>
);

export default SectionTitle;
