import Card from "./card";

export default function RenderCards({ data }) {
  return (
    <div className="cards">
      {data?.map(({ id, mediaType }) => (
        <Card key={id} id={id} mediaType={mediaType} />
      ))}
    </div>
  );
}
