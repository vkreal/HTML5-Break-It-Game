cd C:\Users\vkreal\Documents\Visual Studio 2010\WebSites\html5\build
z.py "C:\Users\vkreal\Documents\Visual Studio 2010\WebSites\html5\js"
java -jar compiler.jar --js prod.js > compiled.js
DEL /Q prod.js