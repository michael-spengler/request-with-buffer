# Request With Buffer
As simple as it gets

## Usage Example
    import { RequestWithBuffer } from "./request-with-buffer"
    
    const requestWithBuffer = new RequestWithBuffer()
    const bufferIntervalInMilliSeconds: number = 20000

    const result: any = 
        await requestWithBuffer.get(options, bufferIntervalInMilliSeconds)

    console.log(result)
    

## Feedback
If you find any issues or want to share improvement proposals in general feel free to open an issue [here](https://github.com/michael-spengler/request-with-buffer).


## Contribute
I am interested in save and useful enhancements. Feel free to create [Pull Requests](https://github.com/michael-spengler/request-with-buffer/pulls) on my Repository.