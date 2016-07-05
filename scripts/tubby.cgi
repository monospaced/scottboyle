#!/usr/bin/perl -w

use CGI qw(:standard);
use CGI::Carp qw(warningsToBrowser fatalsToBrowser);
use Net::SMTP;
use MIME::Base64;

#
# Proper header to make server happy. 
#
#print "Content-Type: text/html\r\n\r\n";

#
# Set system vars for SMTP session 
#
$smtphost = "smtp.webfaction.com";
$username = 'monospaced'; # Mailhost username
$password = 'rast@FAR1'; # Mailhost password

#
# Current timezone offset between the location of recipient and the host.
#
$TZoffset = 5;	# Offset for PST from CDT

#
# Fixed form parameterss
#
$emailto = 'info\@scottboyle.co.uk';	# Address for form output recipient
$subject = 'Email from the web form!';
#
# Capture form post data. Assumes three fields in the form: email, name, comments. 
#
$form = new CGI;
$emailfrom = $form->param('email'); 
$message = $form->param('message'); 

#
# Create a new SMTP object. Set Debug to 0 before publishing.
#
$smtp = Net::SMTP->new($smtphost,
Debug => 0, # Set to 1 to enable debug msg in logs or terminal
Timeout => 5
);

#
# Authenticate SMTP session NOTE: $smtp->auth method does not work in this context. 
#
$smtp->datasend("AUTH LOGIN\n");

#
# Enter username and password for the SMTP authentication
#
$smtp->datasend(encode_base64($username));
$smtp->datasend(encode_base64($password));

#
# Send the MAIL command to the server with the 'from' field
#
$smtp->mail($emailfrom);

#
# Pass the recipient address to the server with the 'to' field
#
$smtp->to($emailto);

#
# Start the message
#
$smtp->data();

# Send message data 

# This section creates the SMTP header
#
$smtp->datasend("MIME-Version: 1.0\n");
$smtp->datasend("From: $emailfrom\n");
$smtp->datasend("To: $emailto\n");
$smtp->datasend("Date: " . date_r() . "\n");
$smtp->datasend("Subject: $subject");

#
# Line break to separate headers from message body
#
$smtp->datasend("\n\n");

#
# This section creates the message body
#
$smtp->datasend("$message");

#
# End the message. 
#
$smtp->dataend();

#
# Close connection to the server. 
#
$smtp->quit;

#
# Confirm success
#
$url = "http://scottboyle.co.uk/thanks/";
print "Location: $url\n\n";
exit;

#
# Sub to assemble date/time string for mail header 
#
sub date_r
{
my ($ monthday, $mon, $yr, $ time, $hour, $str);
my (@lt) = ();

@lt	 = localtime();
$monthday	= $lt[3];
$mon	 = $lt[4]+1;	 # add 1 because Perl months are 0-11
$yr	 = $lt[5]+1900;	 # add 1900 as a base shift
$hour	 = $lt[2]+$TZoffset;	# compensate for time zone
$time = sprintf("%02d:%02d:%02d", $hour, $lt[1], $lt[0]);

$str = $monthday . "/" .$mon . "/" . $yr . " " . $time;

return $str;
}
