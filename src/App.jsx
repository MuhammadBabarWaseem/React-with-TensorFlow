
import styles from "./style";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ImageGesture from "./pages/ImageGesture";
import ImageGestureOnUpload from "./pages/UploadImageGesture";
import CamGesture from "./pages/CamGesture";
import ObjectDetection from "./pages/ObjectDetection";
import { Navbar, Hero, Stats, Business, Billing, CardDeal, Testimonials, Clients, CTA, Footer } from "./components";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <div>
              <div className={`${styles.paddingX} ${styles.flexCenter} bg-primary w-full overflow-hidden sticky top-0 z-[9]`}>
                <Navbar />
              </div>
              <div className="bg-primary w-full overflow-hidden">
                <div className={`bg-primary ${styles.flexStart}`}>
                  <Hero />
                </div>
                <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
                  <div className={`${styles.boxWidth}`}>
                    <Stats />
                    <Business />
                    <Billing />
                    <CardDeal />
                    <Testimonials />
                    <Clients />
                    <CTA />
                    <Footer />
                  </div>
                </div>
              </div>
            </div>
          } />

          <Route path="/image" element={
            <div>
              <div className={`${styles.paddingX} ${styles.flexCenter} bg-primary w-full overflow-hidden sticky top-0 z-[9]`}>
                <Navbar />
              </div>
              <ImageGesture />
            </div>
          } />

          <Route path="/uploadimage" element={
            <div>
              <div className={`${styles.paddingX} ${styles.flexCenter} bg-primary w-full overflow-hidden sticky top-0 z-[9]`}>
                <Navbar />
              </div>
              <ImageGestureOnUpload />
            </div>
          } />

          <Route path="/camGesture" element={
            <div>
              <div className={`${styles.paddingX} ${styles.flexCenter} bg-primary w-full overflow-hidden sticky top-0 z-[9]`}>
                <Navbar />
              </div>
              <CamGesture />
            </div>
          } />

          <Route path="/objectDetection" element={
            <div>
              <div className={`${styles.paddingX} ${styles.flexCenter} bg-primary w-full overflow-hidden sticky top-0 z-[9]`}>
                <Navbar />
              </div>
              <ObjectDetection />
            </div>
          } />




        </Routes>
      </BrowserRouter>


    </>
  );
}

export default App;
