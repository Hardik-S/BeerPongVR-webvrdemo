# Beer Pong VR
Hack the North 2018 project

## The Team:
- Garand Tyson (Motion Controls and VR Headset)
- Hardik Shrestha (Voxel Models)
- Ilija Milisav (A-Frame Developer)
- Russell Goldman (A-Frame Developer)

## Tools:
[A-Frame](https://aframe.io/), [MagicaVoxel](https://ephtracy.github.io/), Vive / Oculus Rift

## Development

Install dependencies with the legacy peer resolver because the A-Frame 0.4.x
dependency tree predates npm's current peer dependency rules:

```sh
npm ci --ignore-scripts --legacy-peer-deps
npm test
```

The test command runs a webpack smoke build for `components/waitForAirhorn.js`
and writes the temporary bundle outside the repository.

The scene loads A-Frame from the CDN script in `index.html`. The old
top-level drag bundle is not loaded by the page, so the npm install keeps only
the tooling needed for the smoke build.

## Devpost:
https://devpost.com/software/beer-pong-vr

## Screenshots
![fullView](https://user-images.githubusercontent.com/15056496/45596777-82c1c900-b98f-11e8-9fbd-bc52223a828e.png)
![tableView](https://user-images.githubusercontent.com/15056496/45596779-82c1c900-b98f-11e8-9f5e-1dcb15ec361b.png)
![goose](https://user-images.githubusercontent.com/15056496/45596778-82c1c900-b98f-11e8-9902-83ec535ced8a.png)
![feridun](https://user-images.githubusercontent.com/15056496/45596780-82c1c900-b98f-11e8-8326-6df8a90cda49.png)
