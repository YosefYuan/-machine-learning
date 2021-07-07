import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';

window.onload = async () => {
  const xs = [1, 2, 3, 4];
  const ys = [1, 3, 5, 7];
  const surface = { name: 'Scatterplot' };
  tfvis.render.scatterplot(surface, {
    values: xs.map((x, i) => ({ x, y: ys[i] })),
  });

  // 单层神经网络
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
  model.compile({
    // 均方误差
    loss: tf.losses.meanSquaredError,
    // 优化器： 随机梯度下降
    optimizer: tf.train.sgd(0.1),
  });

  const inputs = tf.tensor(xs);
  const labels = tf.tensor(ys);
  await model.fit(inputs, labels, {
    // 单次学习样本数量
    batchSize: 4,
    // 学习的次数
    epochs: 100,
    callbacks: tfvis.show.fitCallbacks({ name: '训练过程' }, ['loss']),
  });

  const x = 5;
  const output = model.predict(tf.tensor([x]));
  output.print();
  alert(`x为${x}时， y为${output.dataSync()[0]}`);
};
