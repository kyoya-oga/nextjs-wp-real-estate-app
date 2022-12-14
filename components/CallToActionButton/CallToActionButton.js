import ButtonLink from "components/ButtonLink/ButtonLink";

export default function CallToActionButton({
  align = "left",
  buttonLabel,
  destination,
}) {
  const alignMap = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };
  return (
    <div className={alignMap[align]}>
      <ButtonLink destination={destination} label={buttonLabel} />
    </div>
  );
}
