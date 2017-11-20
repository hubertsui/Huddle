# Huddle

**Table of content**

[Foreword](#foreword)

[Microsoft Teams](#microsoft-teams)

* [Enable Microsoft Teams feature](#enable-microsoft-teams-feature)
* [Create Teams](#create-teams)
* [Update Each Team](#update-each-team)

[Import and publish LUIS App](#import-and-publish-luis-app)

* [Import LUIS App](#import-luis-app)
* [Set application as public](#set-application-as-public)
* [Set Application as Public](#set-application-as-public)
* [Train and Publish the App](#train-and-publish-the-app)

[Create and configure Bot](#create-and-configure-bot)

* [Create a Bot](#create-a-bot)
* [Customize and Configure the Bot](#customize-and-configure-the-bot)
* [Add Microsoft Teams Channel](#add-microsoft-teams-channel)
* [Create SharePoint Site and Lists](#create-sharepoint-site-and-lists)

[Create SharePoint Site and Lists](#create-sharepoint-site-and-lists)

* [Create a site collection](#create-a-site-collection)
* [Provision Lists](#provision-lists)
* [Add preset data](#add-preset-data)

[Generate a self-signed certificate](generate-a-self-signed-certificate)

* [Generate certificate with PowerShell](#generate-certificate-with-powershell)
* [Get keyCredential](#get-keycredential)
* [Export the Certificate and Convert to Base64 String](#export-the-certificate-and-convert-to-base64-string)

[Create App Registrations in AAD](#create-app-registrations-in-aad)

* [Get Tenant Id](#get-tenant-id)
* [Create App Registration for the Bot Web App](#create-app-registration-for-the-bot-web-app)
* [Create App Registration for the Metric Web App](#create-app-registration-for-the-metric-web-app)
* [Create App Registration for the MS Graph Connector](create-app-registration-for-the-ms-graph-connector)
* [Add keyCredential to App Registrations](#add-keycredential-to-app-registrations)

[Deploy Azure Components with ARM Template](#deploy-azure-components-with-arm-template)

* [GitHub Authorize](#github-authorize)
* [Deploy Azure Components](#deploy-azure-components)
* [Handle Errors](#handle-errors)

[Follow-up Steps](#follow-up-steps)

* [Add Reply URL and Admin Consent Bot Web App](#add-reply-url-and-admin-consent-bot-web-app)
* [Add Reply URL and Admin Consent Metric Web App](#add-reply-url-and-admin-consent-metric-web-app)
* [Update Bot Messaging Endpoint](#update-bot-messaging-endpoint)
* [Verify the Bot](#verify-the-bot)
* [Authorize Planner API Connection](#authorize-planner-api-connection)
* [Authorize Teams API Connection](#authorize-teams-api-connection)
* [Authorize Microsoft Graph API Connection](#authorize-microsoft-graph-api-connection)

[Configure Teams App](#configure-teams-app)

* [Start Conversation with The Bot](#start-conversation-with-the-bot)
* [Create Teams App Package and Side-load It](#create-teams-app-package-and-side-load-it)
* [Add Metric Input Tab](#add-metric-input-tab)
* [Add Idea Board Tab](#add-idea-board-tab)

## Foreword

An Azure AAD is required to register the app registrations. In this document, the Azure AAD will be called "Huddle AAD", and an account in Huddle AAD will be called Huddle work account.

* All app registrations should be created in the Huddle AAD. 
* Bot/Luis/Microsoft App should be registered with a Huddle work account.


* SharePoint lists should be created on SharePoint which associated with Huddle AAD.

An Azure Subscription is required to deployment the Azure components. We will use the [ARM Template](azuredeploy.json) to deploy these Azure components automatically. 

## Microsoft Teams

### Enable Microsoft Teams feature

Please following the [Enable Microsoft Teams features in yourOffice 365 organization](https://docs.microsoft.com/en-us/microsoftteams/enable-features-office-365).

Make sure thefollowing options are turned on:

* Allow external apps in Microsoft Teams

* Allow sideloading of external apps

  ![](Images/ms-teams-configure.png)

### Create Teams

Excel & power shell

Global Team

### Update Each Team

1. Active the default planner associating the team and has the same name.

   Open <https://www.office.com>, sign in.

   ![](Images/ms-planner-01.png)

   Click  **Planner**.

   Find the planner which has the same name as the team, then click it.

   ![](Images/ms-planner-02.png)


2. Create the following buckets:
   * NewIdea
   * Inprogress
   * Completed
   * Shareable

## Import and publish LUIS App

### Import LUIS App

1. Open [https://www.luis.ai/](https://www.luis.ai/),and sign in.

2. Finish or skip the welcome page. Then go to the applications page:

   ![](Images/luis-01.png)

3. Click **Import App**.

   ![](Images/luis-02.png)

   * Click**Choose File**, and *select /Files/* *LUISApp.json*.
   * Click**Import**. 

   ![](Images/luis-03.png)

4. Copy aside the **App Id**. It will be used as the value of the **Luis App Id** parameter of the ARM Template.

### Set application as public

1. Click **Settings**. 

   ![](Images/luis-04.png)

2. Check **Set application as public**. 

   ![](Images/luis-05.png)

3. Click **Yes**.

### Train and Publish the App

1. Click **Train& Test** at the left.

   ![](Images/luis-06.png)

   Click **Train Application**.

2. Click **Publish App** at the left.

   ![](Images/luis-07.png)

3. Click **Publish to production slot**.

## Create and configure Bot

### Create a Bot

1. Open [https://dev.botframework.com](https://dev.botframework.com) in browser, then sign in with a workaccount.

   ![](Images/bot-01.png)

2. Click **My bots**, then click **Create a bot**.

   ![](Images/bot-02.png)

3. Click **Create**

   ![](Images/bot-03.png)

4. Select **Register an existing bot built using Bot Builder SDK**. hen click **Ok**.

### Customize and Configure the Bot

1. Upload icon:

   ![](Images/bot-04.png)

   Click **Upload custom icon**, then select /Files/*HuddleBotIcon.png*.


2. Input the fields:

   ![](Images/bot-05.png)

   * **Display name**: Huddle Bot
   * **Bot handle**: HuddleBot*<Prefix>*
   * **Long description**: This is the idea bot used to create and list ideas 

     > Note: 
     >
     > - **Bot handle** should be unique, please add some suffix to avoid confliction.
     > - **Bot handle** will be used as the value of **Bot Id** parameter of the ARM Template. Please copy it aside.

3. Leave **Message endpoint** empty

   ![](Images/bot-06.png)


4. Configure Microsoft App

   ![](Images/bot-07.png)

   Click **Create Microsoft App ID and password**.

   ![](Images/bot-08.png)

   Login in with the work account.

   An app will be created automatically:

   ![](Images/bot-09.png)

   Copy aside the App ID. It will be used as the value of **MicrosoftAppId** App setting. It will also be used in the Teams App **manifest.json** file as id and botId.

   Then click **Generate an app password to continue**.

   ![](Images/bot-10.png)

   Copy aside the password, It will be used as the value of **MicrosoftAppPassword **App setting.

   Then click **OK**.

   Click **Finish** and go back to Bot Framework.

   ![](Images/bot-11.png)

5. Skip **Analytics** and **Admin** sections.

6. Go to the end of the page:

   ![](Images/bot-12.png)

   Check thecheckbox, and click **Register**.

   > Note: Ifyou got error of the Bot handle: Id is already in use. Please use another one.

7. Click **OK**. 

   ![](Images/bot-13.png)

### Add Microsoft Teams Channel

1. Click the **Microsoft Teams Icon** under **Add a channel** section.

   ![](Images/bot-14.png)

2. Click **Done**

   ![](Images/bot-15.png)

3. Right click the new added **Microsoft Teams** channel.

   ![](Images/bot-16.png)

   Click **Copy link address**, and paste the URL to someplace. It will be used to add the Bot to Microsoft Teams later.

## Create SharePoint Site and Lists

### Create a site collection

1. Opena web browser and go to SharePoint Administration Center.

   `https://<YourTenant>-admin.sharepoint.com/_layouts/15/online/SiteCollections.aspx`

2. Click**New** -> **Private Site Collection**.

   ![](Images/sp-01.png) 

3. Fill in the form:

   ![](Images/sp-02.png)

   * In the **Title **field,enter site title. 
   * In the **WebSite Address** field, enter hospital site URL.
   * **Select a language**: English
   * In the **Template Selection** section, select **Team Site **as **site template.**
   * **Time Zone** should be (UTC-08:00) Pacific Time (US and Canada)
   * **Administrator**should be the alias of the individual you want to have full administratorrights on this site. 
   * ** StorageQuote **is how much space you will need for the assets for the end user
   * **Leave Server Resource Quota **at 300. (This value can be adjusted later if needed)

4. Click **OK**

### Provision Lists

1. Install SharePointPnPPowerShellOnline module, if you have not installed it. 

   Please follow: <https://msdn.microsoft.com/en-us/pnp_powershell/pnp-powershell-overview#installation>

2. Open Power Shell, then execute the command below to connect to the site you just created:

   ```powershell
   Connect-PnPOnline –Url https://<Tenant>.sharepoint.com/sites/<Site> –Credentials (Get-Credential)
   ```

   > Note: Please replace *<Tenant>* and *<Site>* 

3. Login in with an admin account.

   ![](Images/sp-03.png)

4. Navigate to /Files folder in PowerShell, thenexecute the following command:

   ```powershell
   Apply-PnPProvisioningTemplate -Path PnPProvisioningTemplate.xml
   ```

### Add preset data

Add the some categories to the Categories list, for example:

* Safety/Quality
* Access
* Experience
* Finance
* People

## Generate a self-signed certificate

### Generate certificate with PowerShell

Run PowerShell as administrator, then execute the commands below:

~~~powershell
$cert = New-SelfSignedCertificate -Type Custom –KeyExportPolicy Exportable -KeySpec Signature -Subject "CN=Huddle App-only Cert" -NotAfter (Get-Date).AddYears(20) -CertStoreLocation "cert:\CurrentUser\My" -KeyLength 2048
~~~

> Note: please keep the PowerShell window open until you finish the steps below.

### Get keyCredential

Execute the commands below to get keyCredential:

Feel free to change the file path at the end of the command.

~~~powershell
$keyCredential = @{}
$keyCredential.customKeyIdentifier = [System.Convert]::ToBase64String($cert.GetCertHash())
$keyCredential.keyId = [System.Guid]::NewGuid().ToString()
$keyCredential.type = "AsymmetricX509Cert"
$keyCredential.usage = "Verify"
$keyCredential.value = [System.Convert]::ToBase64String($cert.GetRawCertData())
$keyCredential | ConvertTo-Json > c:\keyCredential.txt
~~~

The keyCredential is in the generated file, and will be used to create App Registrations in AAD.

![](Images/cert-key-credential.png)

### Export the Certificate and Convert to Base64 String

The following commands will export the certificate and convert it to base64 string.

~~~powershell
$password = Read-Host -Prompt "Enter password" -AsSecureString
$bytes = $cert.Export([System.Security.Cryptography.X509Certificates.X509ContentType]::Pfx, $password)
[System.Convert]::ToBase64String($bytes) | Out-File 'c:\cert-base64.txt'
~~~

You will be prompted to input a password to protect the certificate. Please copy aside the password. It will be used as the value of the **Certificate Pfx Password** parameter of the ARM Template

The base64 string of the certificate is in the generated text file, and will be used as the value of the **Certificate Pfx Base64** parameter of the ARM Template.

![](Images/cert-base64.png)

## Create App Registrations in AAD 

### Get Tenant Id

1. Open the AAD in Azure Portal, then get the **Directory ID**.

   ![](Images/aad-tenant-id.png)

   ​	The **Directory ID** will be used as the value of **Tenant Id** parameter of the ARM Template.

### Create App Registration for the Bot Web App

2. Create a new App Registration:

   * Name: Huddle Bot Web App

   * Application Type: Web app/API

   * Sign-on URL: https://huddle/bot-web-app

   * Permissions:

      | API                                      | Permission Type | Permissions                              |
      | ---------------------------------------- | --------------- | ---------------------------------------- |
      | Office 365 SharePoint Online<br />(Microsoft.SharePoint) | Application     | Read and write items and lists in all site  collections |
      | Microsoft  Graph                         | Delegated       | Read and  all groups<br />Read  all users’ full profiles |

3. Copy aside the **Application Id**. It will be used as the values of **Bot Client Id** parameter of the ARM Template.

4. Create a new Key and copy aside its value. The key value will be used as the value of **Bot Client Secret** parameter of the ARM Template.

### Create App Registration for the Metric Web App

1. Create a new App Registration \:

   * Name: Huddle Metric Web App

   * Application Type: Web app/API

   * Sign-on URL: https://huddle/metric-web-app

   * Permissions:

      | API                                      | Permission Type | Permissions                              |
      | ---------------------------------------- | --------------- | ---------------------------------------- |
      | Office 365 SharePoint Online<br />(Microsoft.SharePoint) | Application     | Read and write items and lists in all site  collections |
      | Windows Azure Active Directory<br />(Microsoft.Azure.ActiveDirectory) | Delegated       | Read directory data<br />Sign in and read user profile |

2. Copy aside the **Application Id**. It will be used as the values of **Metric Client Id** parameter of the ARM Template.

3. Create a new Key and copy aside its value. The key value will be used as the value of **Metric Client Secret** parameter of the ARM Template.

### Create App Registration for the MS Graph Connector

1. Create a new App Registration:

   * Name: Huddle MS Graph Connector

   * Application Type: Web app/API

   * Sign-on URL: https://huddle/ms-graph-connector

   * Permissions:

      | API             | Permission Type | Permissions                              |
      | --------------- | --------------- | ---------------------------------------- |
      | Microsoft Graph | Delegated       | Read and write all groups<br />Read all users’ full profiles |

2. Copy aside the **Application Id**. It will be used as the values of **Graph Client Id** parameter of the ARM Template.

3. Create a new Key and copy aside its value. The key value will be used as the value of **Graph Client Secret** parameter of the ARM Template.

### Add keyCredential to App Registrations 

Follow the steps below to add keyCredential to App Registrations of the Bot Web App and Metric Web App

1. Open a App Registration

   ![](Images/app-registration-manifest-1.png)

2. Click **Manifest**

   ![](Images/app-registration-manifest-2.png)

3. Insert the keyCredential into the square bracketsof **keyCredentials** node.
4. Click **Save**.


## Deploy Azure Components with ARM Template

### GitHub Authorize

1. Generate Token

   - Open [https://github.com/settings/tokens](https://github.com/settings/tokens) in your web browser.

   - Sign into your GitHub account where you forked this repository.

   - Click **Generate Token**

   - Enter a value in the **Token description** text box

   - Select the following s (your selections should match the screenshot below):

     - repo (all) -> repo:status, repo_deployment, public_repo
     - admin:repo_hook -> read:repo_hook

     ![](Images/github-new-personal-access-token.png)

   - Click **Generate token**

   - Copy the token

2. Add the GitHub Token to Azure in the Azure Resource Explorer

   - Open [https://resources.azure.com/providers/Microsoft.Web/sourcecontrols/GitHub](https://resources.azure.com/providers/Microsoft.Web/sourcecontrols/GitHub) in your web browser.

   - Log in with your Azure account.

   - Selected the correct Azure subscription.

   - Select **Read/Write** mode.

   - Click **Edit**.

   - Paste the token into the **token parameter**.

     ![](Images/update-github-token-in-azure-resource-explorer.png)

   - Click **PUT**

### Deploy Azure Components

1. Fork this repository to your GitHub account.

2. Click the Deploy to Azure Button:

   [![Deploy to Azure](https://camo.githubusercontent.com/9285dd3998997a0835869065bb15e5d500475034/687474703a2f2f617a7572656465706c6f792e6e65742f6465706c6f79627574746f6e2e706e67)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FTylerLu%2FHuddle%2Fmaster%2Fazuredeploy.json)

3. Fill in the values in the deployment page:

   ![](Images/azure-deploy.png)

   Select the **I agree to the terms and conditions stated above** checkbox.

4. Click **Purchase**.

### Handle Errors

# Follow-up Steps

### Add Reply URL and Admin Consent Bot Web App

1. Get the URL of the Web app, and change the schema to http**s**, we will get a base URL.

    For example: `https://huddle-bot.azurewebsites.net`

2. Append `/` to the base URL, we will get the replay URL. 

   For example: `https://huddle-bot.azurewebsites.net/`

   Add it the Bot App Registration.

3. Append `/admin/consent` to the base URL, we will get the admin consent URL.

   For example: `https://huddle-bot.azurewebsites.net/admin/consent`

   Open it in a browser, sign in with an admin account.

   ![](Images/bot-web-app-admin-consent.png)

   Click **Accept**.

### Add Reply URL and Admin Consent Metric Web App

Follow the similar steps in previous chapter to add the reply URL and admin consent. 

### Update Bot Messaging Endpoint

1. Append `/api/messages` to the base URL of the Bot Web App, we will get the message endpoint URL.

   For example: `https://huddle-bot-dev.azurewebsites.net/api/messages`

2. Got to the Bot you created, then click **SETTINGS**.

   ![](Images/bot-17.png)

3. Fill the **Message endpoint**

4. Click **Save Changes** at the bottom.

   >Note: if you get error like below, please refresh the page and try it several times.
   >
   >![](Images/bot-18.png)

### Verify the Bot

1. Navigate to the bot you registered.

   ![](Images/bot-19.png)

2. Click -**>Test**, input “list ideas”, then send.

   ![](Images/bot-20.png)

3. If you get message like below, the Bot isdeployed successfully.                                   

   > Note: If the message could not be send, please click **retry **for a few times**.**
   >
   > ![](Images/bot-21.png)             

### Authorize Planner API Connection

1. Navigate to the resource group.

   ![](Images/planner-api-connection-01.png)

2. Click the planner API Connection.

   ![](Images/planner-api-connection-02.png)

3. Click **This connection is not authenticated**.

   ![](Images/planner-api-connection-03.png)


4. Click **Authorize**.

   Pick up orinput the Huddle user account mentioned eelier. The user account should be every teams.

   Sign in the account.

5. Click **Save** at the bottom.

### Authorize Teams API Connection

Follow the similar steps in previous chapter to authorize teams API Connection

### Authorize Microsoft Graph API Connection

Due to some unknown reason, we can authorize the **microsoft-graph** API Connection as above. 

![](Images/ms-graph-connection.png)

Please use the steps below instead.

1. Click **ListPlans** Logic App

   ![](Images/list-plans-logic-app-01.png)          

2. Click **Edit**

    ![](Images/list-plans-logic-app-02.png)

3. Click **Connections **to expand it, then click **Invalid connection**. ![](Images/list-plans-logic-app-03.png)

4. Pickup or input the Huddle account used to authorize planner and teams API Connections, then sign in.

## Configure Teams App

### Start Conversation with The Bot

Follow the step below to start 1:1 conversation with the Bot in Microsoft Teams

1. Find the URL of Microsoft Teams Channel of the Bot, then open it in your browser:

   ![](Images/bot-22.png)

2. Click **Open MicrosoftTeams**.

Another way to start 1:1 talk is using the MicrosoftAppId of the Bot:

![](Images/bot-23.png)

### Create Teams App Package and Side-load It

1. Open */Files/TeamsAppPackage/manifest.json*with a text editor.

2. Replace the following 2 placeholder with thecorresponding values you got in previous guides

   * <MicrosoftAppId>: the App Id of theMicrosoft App registered when creating the Bot

     ![](Images/ms-teams-01.png)

   * <MetricWebAppDomain>: the domain of the Metric Web App

     ![](Images/ms-teams-02.png)

3. Save the changes.

4. Zip the files in */Files/TeamsAppPackage *folder.

   ![](Images/ms-teams-03.png)

   Name is HuddleTeamsApp.zip.

5. Right-click a team in Microsoft Teams, then click Manage team.

   ![](Images/ms-teams-04.png)

6. Click the **Bots** tab.

   ![](Images/ms-teams-05.png)

7. Then click **Sideloada bot or tab**.
8. Select the *HuddleTeamsApp.zip*.

### Add Metric Input Tab

1. Click ateam.

   ![](Images/ms-teams-06.png)        

2. Click+

   ![](Images/ms-teams-07.png)

3. Click **Huddle App**.

   ![](Images/ms-teams-08.png)

4. Click **Accept**.

   ![](Images/ms-teams-09.png)

5. Click **Save**.

### Add Idea Board Tab

1. Click a team.

   ![](Images/ms-teams-06.png)        

2. Click+

   ![](Images/ms-teams-11.png)

3. Click **Planner**.

4. Sign in with the work account.

   ![](Images/ms-teams-12.png)

   Choose **Use an existing plan**, then select theplan which has the same name with the team.

5. Click **Save**.

   ![](Images/ms-teams-13.png)

6. Click the dropdown icon, then click **Rename**. 

   ![](Images/ms-teams-14.png)

   Input: IdeaBoard

7. Click **Save**. 
