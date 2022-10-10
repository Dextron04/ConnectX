package com.connectX;

import java.io.*;
import java.net.Socket;
import java.util.Date;
import java.util.List;

public class ServerWorker extends Thread {

    private final Socket clientSocket;
    private final Server server;
    private String login = null;
    private OutputStream outputStream;

    public ServerWorker(Server server, Socket clientSocket) {
        this.server = server;
        this.clientSocket = clientSocket;
    }
    @Override
    public void run(){
        try{
            handleClientSocket();
        } catch (IOException e){
            e.printStackTrace();
        } catch (InterruptedException e){
            e.printStackTrace();
        }
    }

    private void handleClientSocket() throws IOException, InterruptedException {
        InputStream inputStream = clientSocket.getInputStream();
        this.outputStream = clientSocket.getOutputStream();

        outputStream.write(("\nEstablishing connection").getBytes());
        for(int i = 0; i < 1; i++){
            Thread.sleep(1000);
        }
        outputStream.write("\n".getBytes());
        outputStream.write(("░░██╗██╗██╗░░░░░  ░█████╗░░█████╗░███╗░░██╗███╗░░██╗███████╗░█████╗░████████╗██╗░░██╗\n" +
                "░██╔╝██║██║░░░░░  ██╔══██╗██╔══██╗████╗░██║████╗░██║██╔════╝██╔══██╗╚══██╔══╝╚██╗██╔╝\n" +
                "██╔╝░██║██║░░░░░  ██║░░╚═╝██║░░██║██╔██╗██║██╔██╗██║█████╗░░██║░░╚═╝░░░██║░░░░╚███╔╝░\n" +
                "███████║██║░░░░░  ██║░░██╗██║░░██║██║╚████║██║╚████║██╔══╝░░██║░░██╗░░░██║░░░░██╔██╗░\n" +
                "╚════██║███████╗  ╚█████╔╝╚█████╔╝██║░╚███║██║░╚███║███████╗╚█████╔╝░░░██║░░░██╔╝╚██╗\n").getBytes());
        outputStream.write("\n".getBytes());

        outputStream.write("Welcome to 4l ConnectX Messaging Client\n".getBytes());
        outputStream.write(" ".getBytes());
        outputStream.write(("To login to your account type login and then your assigned username and password separated " +
                "by a space.\n").getBytes());

        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
        String line ;
        while((line = reader.readLine()) != null) {
            String[] tokens = line.split(" ");
            if (tokens != null && tokens.length > 0) {
                String cmd = tokens[0];
                if ("quit".equalsIgnoreCase(cmd)) {
                    outputStream.write((login + " logged out at " + new Date()).getBytes());
                    System.out.println(login + " logged out at " + new Date());
                    break;
                } else if("login".equalsIgnoreCase(cmd)){
                    handleLogin(outputStream, tokens);
                } else{
                    String msg = "Unknown Command\n";
                    outputStream.write(msg.getBytes());
                }
            }
        }
        clientSocket.close();
    }

    public String getLogin(){
        return login;
    }

    private void handleLogin(OutputStream outputStream, String[] tokens) throws IOException {
        if(tokens.length == 3){
            String login = tokens[1];
            String password = tokens[2];

            String msg;
            if(login.equals("Tushin") && password.equals("Dex") || login.equals("guest") && password.equals("1234")){
                msg = "Access Granted\n";
                outputStream.write(msg.getBytes());
                this.login = login;
                System.out.println("User logged in successfully: " + login + " at " + new Date());

                //send current users status
                String onLinePrompt = "online " + login + "\n";
                List<ServerWorker> workerList = server.getWorkerList();
                for(ServerWorker worker : workerList){
                    worker.send(onLinePrompt);
                }
                outputStream.write("".getBytes());
            } else{
                outputStream.write("\n".getBytes());
                msg = "Access Denied\n";
                outputStream.write("\n".getBytes());
                outputStream.write(msg.getBytes());
            }
        }
    }

    private void send(String onLinePrompt) throws IOException {
        outputStream.write("\n".getBytes());
        outputStream.write(onLinePrompt.getBytes());
    }
}
