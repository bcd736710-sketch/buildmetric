import path from "node:path";
import { Resvg } from "@resvg/resvg-js";
import { PDFDocument } from "pdf-lib";
import type { MomentConfig } from "@/lib/sky/moment";
import { skyProductConfig } from "@/lib/sky/product-config";
import type { SkyComputation } from "@/lib/sky/astronomy";
import { createArtworkScene } from "@/lib/sky/artwork-scene";
import { createArtworkSvg } from "@/lib/sky/artwork-svg";

const { width, dpi } = skyProductConfig.output;

const fontFiles = [
  path.join(
    process.cwd(),
    "node_modules",
    "@fontsource",
    "cormorant-garamond",
    "files",
    "cormorant-garamond-latin-700-normal.woff",
  ),
  path.join(
    process.cwd(),
    "node_modules",
    "@fontsource",
    "inter",
    "files",
    "inter-latin-400-normal.woff",
  ),
  path.join(
    process.cwd(),
    "node_modules",
    "@fontsource",
    "inter",
    "files",
    "inter-latin-700-normal.woff",
  ),
];

export function createPosterSvg(config: MomentConfig, sky: SkyComputation) {
  return createArtworkSvg(createArtworkScene(config, sky));
}

export function renderPosterPng(svg: string) {
  const renderer = new Resvg(svg, {
    dpi,
    font: {
      loadSystemFonts: true,
      fontFiles,
      serifFamily: "Cormorant Garamond",
      sansSerifFamily: "Inter",
      defaultFontFamily: "Inter",
    },
    fitTo: {
      mode: "width",
      value: width,
    },
  });

  return renderer.render().asPng();
}

export async function renderPosterPdf(pngBytes: Uint8Array) {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([841.89, 1190.55]);
  const image = await pdf.embedPng(pngBytes);
  page.drawImage(image, {
    x: 0,
    y: 0,
    width: 841.89,
    height: 1190.55,
  });

  return pdf.save();
}
