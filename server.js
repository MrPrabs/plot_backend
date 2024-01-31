const { execSync } = require('node:child_process')
const { PrismaClient } = require('@prisma/client')
const fs = require('node:fs')
const http = require('node:http')
const url = require('node:url')

// set up web server
const server = http.createServer(listener)

// open database
process.env.DATABASE_URL ||= url.pathToFileURL('production.sqlite3').toString()
const prisma = new PrismaClient();

// last known count
let count = 0

// Map of file extensions to mime types
const mimeTypes = {
  ico: 'image/x-icon',
  js: 'text/javascript',
  css: 'text/css',
  svg: 'image/svg+xml'
}

// Process requests based on pathname
async function listener(request, response) {
  const { pathname } = url.parse(request.url)

  if (pathname === '/') {
    await main(request, response)
  } else if (fs.existsSync(`public${pathname}`)) {
    try {
      const contents = fs.readFileSync(`public${pathname}`, 'utf-8')
      const mimeType = mimeTypes[pathname.split('.').pop()] || 'application/octet-stream'

      response.writeHead(200, { 'Content-Type': mimeType })
      response.write(contents, 'utf-8')
    } catch (error) {
      response.writeHead(500, { 'Content-Type': 'text/plain' })
      response.write(error + '\n')
    }

    response.end()
  } else {
    response.writeHead(404)
    response.end('Not found.')
  }
}

// Main page
async function main(_request, response) {
  // Get current count (may return hull)
  const welcome = await prisma.welcome.findFirst()

  // Increment count, creating table row if necessary
  if (welcome) {
    count = welcome.count + 1
    await prisma.welcome.update({data: { count }, where: {id: welcome.id}})
  } else {
    count = 1
    await prisma.welcome.create({data: { count }})
  }

  // render HTML response
  try {
    let contents = fs.readFileSync('views/index.tmpl', 'utf-8')
    contents = contents.replace('@@COUNT@@', count.toString())

    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.write(contents, 'utf-8')
  } catch (error) {
    response.writeHead(500, { 'Content-Type': 'text/plain' })
    response.write(error + '\n')
  }

  response.end()
}

// run migrations
if (process.env.NODE_ENV === 'production') {
  execSync('npx prisma migrate deploy', { stdio: 'inherit' });
}

// Start web server on port 3000
server.listen(3000, () => {
  console.log('Server is listening on port 3000')
})
