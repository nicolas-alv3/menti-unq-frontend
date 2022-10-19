sudo docker build -t  mentiunqfront .
sudo docker run -p 3000:3000 -v $(pwd):/usr/src/app mentiunqfront
