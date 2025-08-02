import StickyDivOnScroll from "./components/StickyElement/StickyDivOnScroll";
import { Filler } from "./components/Filler";

import appStyles from "./App.module.css";

function App() {
  return (
    <div className={appStyles.appContainer}>
      <h1>Main Header</h1>
      <Filler startIndex={0} numberOfElements={10} />
      <StickyDivOnScroll stickyCheckDelay={250}>
        <div className={appStyles.stickyContentStyle}>
          <h2>This DIV will become sticky!</h2>
          <p>Scroll up and down to see the effect.</p>
        </div>
      </StickyDivOnScroll>
      <Filler startIndex={10} numberOfElements={40} />
    </div>
  );
}

export default App;
