import fs from 'fs-extra';

export const readFile = path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (error, data) => {
      if (error)  reject(error)
      else        resolve(data)
    })
  })
}

export const writeFile = path => text => {
  return new Promise((resolve, reject) => {
    fs.outputFile(path, text, 'utf8', (error) => {
      if (error)  reject(error)
      else        resolve()
    });
  })
}

export const cleanDir = path => {
  return new Promise((resolve, reject) => {
    fs.emptyDir(path, (error) => {
      if (error)  reject(error)
      else        resolve()
    })
  })
}

export const copyFile = source => target => {
  return new Promise((resolve, reject) => {
    fs.copy(source, target, (error) => {
      if (error)  reject(error)
      else        resolve()
    })
  })
}


