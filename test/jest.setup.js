// enzyme 3 requires a react adapter, this file is defined in jest.config.json
// without polyfill, enzyme outputs a warning
import "raf/polyfill";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });
