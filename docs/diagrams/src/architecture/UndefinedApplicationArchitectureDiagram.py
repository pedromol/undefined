import os, sys
os.chdir(os.path.dirname(sys.argv[0])) # Set working directory to diagram directory

from diagrams import Diagram
from diagrams.programming.language import Nodejs
from diagrams.onprem.database import Mysql
from diagrams.onprem.inmemory import Redis

with Diagram("Undefined - Application Architecture Diagram", show=False, direction="TB"):
    undefined = Nodejs("Undefined")
    undefined >> Mysql("UndefinedDB")
    undefined >> Redis("UndefinedCache")
