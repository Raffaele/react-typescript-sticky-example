import StickyDivOnScroll from "./components/StickyElement/StickyDivOnScroll";

import appStyles from "./App.module.css";
import { Filler } from "./components/Filler";

function App() {
  return (
    <div className={appStyles.appContainer}>
      <h1>Main Header</h1>
      <Filler startIndex={0} numberOfElements={10} />
      <StickyDivOnScroll throttleInterval={100}>
        <div className={appStyles.stickyContentStyle}>
          <h2>This DIV bcame sticky!</h2>
          <p>Scroll up and down to see the effect.</p>
        </div>
      </StickyDivOnScroll>
      <Filler startIndex={10} numberOfElements={40} />
    </div>
  );
}

export default App;
