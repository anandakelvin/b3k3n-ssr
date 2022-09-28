import { getInitialProps } from "@/pages/index.js";
import CategoryDetailLayout from "@/src/components/layouts/CategoryDetailLayout.js";

const Page = CategoryDetailLayout;
Page.getInitialProps = getInitialProps;
export default Page;
