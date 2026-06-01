using Microsoft.AspNetCore.Http;
using System.IO;
using System.Threading.Tasks;

namespace staj_proje.Helpers
{
	public static class FileHelper
	{
		public static async Task<string> SaveFileAsync(IFormFile file, string uploadPath)
		{
			if (!Directory.Exists(uploadPath))
			{
				Directory.CreateDirectory(uploadPath);
			}

			var fileName = Path.GetRandomFileName() + Path.GetExtension(file.FileName);
			var filePath = Path.Combine(uploadPath, fileName);

			using (var stream = new FileStream(filePath, FileMode.Create))
			{
				await file.CopyToAsync(stream);
			}

			return $"/pictures2/{fileName}";
		}
	}
}
