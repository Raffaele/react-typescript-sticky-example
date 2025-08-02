import styles from "./Filler.module.css";

type FillerProps = {
  startIndex: number;
  numberOfElements: number;
};

export function Filler({ startIndex, numberOfElements }: FillerProps) {
  return Array.from({ length: numberOfElements }, (_, i) => (
    <section key={startIndex + i} className={styles.section}>
      <div>
        {startIndex + i + 1}. Content of the page to create the scroll effect.
      </div>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </div>
    </section>
  ));
}
