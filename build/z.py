#!/usr/bin/env python 

import sys , os , glob 

startDir = '' 
totalFile = 'prod.js' 

if len(sys.argv) > 1 and os.path.isdir(sys.argv[1]): 
     startDir = sys.argv[1] 
else: 
     print 'Usage: %s <startdir>' % os.path.basename(sys.argv[0]) 
     sys.exit(1) 

tfh = open(totalFile , 'a') 
for f in glob.glob(os.path.join(startDir , '*.js')): 
     #tfh.write('%s contents\n' % f) 
     tfh.write(open(f).read()) 
     tfh.write('\n') 
tfh.close() 