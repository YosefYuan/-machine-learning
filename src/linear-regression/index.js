import * as tfvis from '@tensorflow/tfjs-vis';

window.onload = () => {
  const xs = [1, 2, 3, 4];
  const ys = [1, 3, 5, 7];
  const surface = { name: 'Scatterplot' };
  tfvis.render.scatterplot(surface, {
    values: xs.map((x, i) => ({ x, y: ys[i] })),
  });
};
