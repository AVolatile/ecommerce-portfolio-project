import { ButtonLink } from "@/components/ui";
export default function NotFound() {
  return (
    <div className="not-found">
      <p className="eyebrow">404 / A different route</p>
      <h1>
        This way didn’t
        <br />
        lead anywhere.
      </h1>
      <p>The collection is a good place to start again.</p>
      <ButtonLink href="/shop">Explore the collection</ButtonLink>
    </div>
  );
}
