using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using clsKarateDataAccesse;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace KarateBussinesLayer
{
    public class clsCloundinary
    {
        private static string _CloudName="dz2vs9sbl";
        private static string _APIKEy ="634484822718714";
        private static string _APISecret = "wSjZtEZkC9is0xXv7wnTzQAvX0A";

        private static string _GetPublicIdFromUrl(string url)
        {
            string decodedUrl = Uri.UnescapeDataString(url);
            Uri uri = new Uri(decodedUrl);
            string[] segemnts = uri.Segments;
            string publicId=segemnts[segemnts.Length-1];
            return ("Karate Images/"+publicId.Substring(0,publicId.LastIndexOf('.')));
        }
        public static async Task<string> UploadImage(Stream imageStream, string fileName)
        {
            string imageUrl = "";
            try
            {
                var account = new Account(_CloudName, _APIKEy, _APISecret);
                Cloudinary cloudinary = new Cloudinary(account);

                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(fileName, imageStream),
                    Folder = "Karate Images" 
                };

                var uploadResult = await cloudinary.UploadAsync(uploadParams);

                if (uploadResult.StatusCode == HttpStatusCode.OK)
                {
                    imageUrl = uploadResult.SecureUri.ToString();
                }
            }
            catch (Exception ex)
            {
                clsLoggingEvent.LoogingEvent($"Error: {ex.Message}");
                return "No Image";
            }

            return imageUrl;
        }
        public static async Task<string> UpdateImage(Stream imageStream,string oldImage,string NewImage)
        {
            string oldPublicId = _GetPublicIdFromUrl(oldImage);
            string addedImageUrl="";
            try
            {
                var account = new Account(_CloudName, _APIKEy, _APISecret);
                Cloudinary cloudinary = new Cloudinary(account);

                var deleteResult = cloudinary.DeleteResources(CloudinaryDotNet.Actions.ResourceType.Image, oldPublicId);
                if (deleteResult.StatusCode == HttpStatusCode.OK)
                {
                    var uploadParams = new ImageUploadParams
                    {
                        File = new FileDescription(NewImage, imageStream),
                        Folder = "Karate Images"
                    };

                    var uplloadResult = await cloudinary.UploadAsync(uploadParams);

                    if (uplloadResult.StatusCode.ToString().ToUpper() == "OK")
                    {
                        addedImageUrl = uplloadResult.SecureUri.ToString();
                    }
                }
            }
            catch (Exception ex)
            {
                clsLoggingEvent.LoogingEvent("Error: " + ex.Message);
                return "No Image";
            }

            return addedImageUrl;
        }
        public static async Task<bool> DeleteImage( string ImageLink)
        {
            string oldPublicId = _GetPublicIdFromUrl(ImageLink);

                var account = new Account(_CloudName, _APIKEy, _APISecret);
                Cloudinary cloudinary = new Cloudinary(account);

                var deleteResult = cloudinary.DeleteResources(CloudinaryDotNet.Actions.ResourceType.Image, oldPublicId);
                if (deleteResult.StatusCode == HttpStatusCode.OK)
                      return true;
                else
                      return false;
        }


    }
}
