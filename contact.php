<?php

$email=$_POST['email'];
$phoneNumber=$_POST['phoneNumber'];
$name=$_POST['name'];;
$comment=$_POST['comment'];

include 'connection.php';
$insert="INSERT INTO subscription (id, email, phone, status, createdtime, modifiedtime) VALUES (NULL, '$email', '$phoneNumber', 'New', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)";

$res=mysqli_query($con,$insert);
if(!$res)
{
  echo "error";
}else{
  sendEmail($name,$email,$phoneNumber,$typeBusiness);
  #header('location:index.html');
  #echo '<script type="text/javascript">alert("Data has been submitted Our Executives will contact you")';
  echo "Data has been submitted Our Executives will contact you"; 
//  include ("index.html");
}

function sendEmail($name,$email,$phoneNumber,$typeBusiness){
         $to = "support@capitalking.co.in";
         $subject = "Request For subscription";
         
         $message = "<b>Hi Team</br>This mail is regarding subscription request has been send my below user please respond.</br><b>User</b>:$name</br><b>Contact</b>:$phoneNumber</br><b>Email</b>:$email</br> <b>For Business</b>:$typeBusiness</br></b> </br><b>Regards,</b></br>Information Team</b>";
         $header = "From:info@capitalking.co.in \r\n";
         $header .= "Cc:dilip21lnct@gmail.com \r\n";
         $header .= "MIME-Version: 1.0\r\n";
         $header .= "Content-type: text/html\r\n";
         
         $retval = mail ($to,$subject,$message,$header);
         
         if( $retval == true ) {
            #echo "Message sent successfully...$to";
         }else {
            echo "Message could not be sent...";
         }
}
?>