if [ "`ps -aux | grep /usr/sbin/mosquitto | wc -l`" == "1" ]

then

        echo "mosquitto wasnt running so attempting restart" >> /home/ubuntu/cron.log

        systemctl restart mosquitto

        exit 0

fi

echo "$SERVICE is currently running" >> /home/ubuntu/cron.log

exit 0
 
