import SparkMD5 from 'spark-md5'

/**
 * 使用 spark-md5 库对文件计算 md5 hash
 * @param {File} file
 */
export const useSparkMD5 = (file) => {
    return new Promise((resolve, reject) => {
        const spark = new SparkMD5.ArrayBuffer()

        // 以增量的方式对文件做hash处理

        const chunkSize = 2 * 1024 * 1024

        const chunks = Math.ceil(file.size / chunkSize)

        const chunkList = []

        let currentChunk = 0

        let fileReader = new FileReader()

        fileReader.addEventListener('load', (e) => {
            // ArrayBuffer 读取到的是 这样一个数据类型
            /**
             * @type {ArrayBuffer}
             */
            let chunk = e.target.result

            spark.append(chunk)
            chunkList.push(chunk)

            currentChunk++

            // 继续读取下一块
            if (currentChunk < chunks) {
                loadNext()
            } else {
                console.log('文件全部读取完成')

                // 形成文件hash: 7ac2c2a9ff60a52d1552b347009dd51e

                // 注意 spark.end 不要调用多次，调用几次会计算几次hash,导致结果非期望， console也不要输出 console.log(spark.end())
                resolve({
                    // 调用end方法，返回十六进制计算结果
                    hash: spark.end(),
                    size: file.size,
                    originName: file.name,
                    type: file.type,
                    chunkList
                })
            }
        })

        fileReader.addEventListener('error', (e) => {
            console.log('文件读取失败')
            reject(e)
        })

        const loadNext = () => {
            let start = currentChunk * chunkSize

            let end = 0

            if (start + chunkSize >= file.size) {
                end = file.size
            } else {
                end = start + chunkSize
            }

            // 切片
            let chunk = file.slice(start, end)
            fileReader.readAsArrayBuffer(chunk)
        }

        loadNext()
    })
}
