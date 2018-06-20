# cloudflare-websocket

Cloudflare is one of the popular webhosting solution that natively supports websockets.

However there are certain finer details not well documented.

The most important one is you must serve websocket on SSL.

This sample project helps undertand step by step process to deploy an example solution.

1. From the **network** menu on your cloudflare dashboard for  the domain, ensure that WebSockets are enabled (by default it is enabled)

2. from the **crypto** menu on your cloudflare dashboard, scroll down to `Create Certificate`.

    Create a ccertificate for all your subdomains (say *.mymaindomain.com) Copy down the public Certificate (as **server.crt**) and private Key (**server.key**)

3. On the server (e.g. EC2 instance **ec2-myec2instance.myregion.compute.amazonaws.com** ) clone this project

    `git  clone https://github.com/AmitTeli/cloudflare-websocket.git`

    change to cloudflare-websocket directory and run `npm install`
    
    copy the **server.crt** and **server.key** files to **cloudflare-websocket/sslcert** subfolder

    run `npm start`

4. On cloudflare **dns**, add a cname/A entry for your EC2 instance **ec2-myec2instance.myregion.compute.amazonaws.com**, say **mywsproject**

5. now from the browser access https://mywsproject.maymaindomain.com, you should see the messages sent from the server.

The websocket on SSL code works without cloudflare as well as long as you provide correct ssl certificates for your domain name.
