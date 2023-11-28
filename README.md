# mercury-sdk

## Local development
Use `yarn`

You can use the script `run.sh`. To run a docker image with node. 

Install dependencies with `yarn`

In order to get your changes reflected in another project that is using `yarn link` to point to this one you need to run:
```
yarn tsc
```
This will compile typescript into the folder `dist/` where other projects will look for the code.