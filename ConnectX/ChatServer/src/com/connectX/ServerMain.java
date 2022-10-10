package com.connectX;

import java.io.OutputStream;
import java.net.ServerSocket;
import java.io.IOException;
import java.net.Socket;
import java.nio.charset.StandardCharsets;
import java.util.Date;

public class ServerMain {


    public ServerMain() {
    }

    public static void main(String[] args){
        System.out.println();
        ServerMain serverMain = new ServerMain();
        int port = 4444;
        Server server = new Server(port);
        server.start();
        
        }
}
