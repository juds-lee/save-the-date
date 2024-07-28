// module.exports = {
//   build: {
//     templates: {
//       source: 'emails/src/templates',
//       destination: {
//         path: 'emails/build',
//       },
//     },
//   },
// };

/** @type {import('@maizzle/framework').Config} */
module.exports = {
  build: {
    posthtml: {
      options: {

      }
    },
    templates: {
      source: 'src/templates',
      destination: {
        path: 'build_local',
      },
      assets: {
        source: 'src/images',
        destination: 'images',
      },
    },
  },
}
