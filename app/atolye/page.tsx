import ImagePanel from "../components/ImagePanel";

export const metadata = {
  title: "Atölye — VELA Atölye",
  description: "Dünya standartlarında el işçiliği.",
};

export default function AtolyePage() {
  return (
    <section className="page atolye">
      <div className="wrap">
        <header className="page__head">
          <p className="eyebrow">Atölye</p>
          <h1 className="section-title">El işçiliği, denizin ölçüsü</h1>
          <p className="page__lead">
            Atölyemizde her tekne, dünya standartlarında ve tümüyle elle inşa edilir.
          </p>
        </header>

        <div className="atolye__grid">
          <ImagePanel label="Atölye" tall />
          <div className="atolye__text">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
