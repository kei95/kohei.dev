import { NextPageContext } from "next";
import getOrigin from '../utility/getOrigin';

function RobotsTxt() {
  return null;
}

RobotsTxt.getInitialProps = async ({ req, res }: NextPageContext): Promise<any> => {
  res!.setHeader("content-type", "text/plain");
  res!.write(`Sitemap: ${getOrigin(req)}/sitemap.xml\n`);
  res!.end();

  return;
};

export default RobotsTxt;
