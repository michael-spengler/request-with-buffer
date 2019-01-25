# Request With Buffer
As simple as it gets

## Basic Usage
    import { RequestService } from "request-with-buffer"
    
    const requestService = RequestService.getInstance()
    const bufferIntervalInMilliSeconds: number = 60 * 60 * 1000 // hourly

    const options: any = {
        url: "https://EnterURLHere",
    }

    const result: any = 
        await requestService.get(options, bufferIntervalInMilliSeconds)

    console.log(result)
    
## Advanced Usage
    const options: any = {
        url: "https://EnterURLHere",
    }

    // see basic usage plus: 

    // you might want to check what's in the buffer 
    const bufferContent: IBufferEntry[] = requestService.getCompleteBufferContent()

    // you might want to clear the buffer from time to time
    requestService.deleteBuffer()

    // you might want to clear a specific buffer entry from time to time
    requestService.deleteBufferEntry(options)


## Feedback
If you find any issues or want to share improvement proposals in general feel free to open an issue [here](https://github.com/michael-spengler/request-with-buffer).


## Contribute
I am interested in save and useful enhancements. Feel free to create [Pull Requests](https://github.com/michael-spengler/request-with-buffer/pulls) on my Repository.