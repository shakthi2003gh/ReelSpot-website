import Banner from "./banner";
import CardSection from "./cardSection";

export default function LandingPage({ recommends, sections }) {
  return (
    <div className="page">
      <Banner recommends={recommends} />

      {sections.map(({ id, ...props }) => (
        <CardSection key={id} {...props} />
      ))}
    </div>
  );
}
