import {
  Swipe,
  SwipeItem,
  Button,
  Popup,
  Field,
  CellGroup,
  Form,
  Icon,
} from "vant";
// 放入数组中
let plugins = [Swipe, SwipeItem, Button, Popup, Field, CellGroup, Form, Icon];
export default function getVant(app) {
  plugins.forEach((item) => {
    return app.use(item);
  });
}
