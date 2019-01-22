# Request With Buffer
As simple as it gets

## Usage Example
    import { RequestService } from "request-with-buffer"
    
    const requestService = new RequestService()
    const bufferIntervalInMilliSeconds: number = 60 * 60 * 1000 // hourly

    const options: any = {
        url: "https://EnterURLHere",
    }

    const result: any = 
        await requestService.get(options, bufferIntervalInMilliSeconds)

    console.log(result)
    

## Feedback
If you find any issues or want to share improvement proposals in general feel free to open an issue [here](https://github.com/michael-spengler/request-with-buffer).


## Contribute
I am interested in save and useful enhancements. Feel free to create [Pull Requests](https://github.com/michael-spengler/request-with-buffer/pulls) on my Repository.