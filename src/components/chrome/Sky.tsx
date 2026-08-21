/** Fixed atmosphere behind the whole page, cross-faded by the journey engine. */
export function Sky() {
  return (
    <>
      <div className="sky" aria-hidden="true">
        <div className="sky__layer sky__layer--day" />
        <div className="sky__layer sky__layer--sunset" />
        <div className="sky__layer sky__layer--night" />
        <div className="sky__stars" />
        <div className="sky__glow-a" />
        <div className="sky__glow-b" />
        <div className="sky__sun" />
        <div className="sky__sea" />
        <div className="grain" aria-hidden="true" />
      </div>
    </>
  );
}
