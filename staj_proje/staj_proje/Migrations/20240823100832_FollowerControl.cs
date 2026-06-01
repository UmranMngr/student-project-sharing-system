using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace staj_proje.Migrations
{
    /// <inheritdoc />
    public partial class FollowerControl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_UserFollowers_FollowerId",
                table: "UserFollowers");

            migrationBuilder.CreateIndex(
                name: "IX_UserFollowers_FollowerId_FollowedId",
                table: "UserFollowers",
                columns: new[] { "FollowerId", "FollowedId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_UserFollowers_FollowerId_FollowedId",
                table: "UserFollowers");

            migrationBuilder.CreateIndex(
                name: "IX_UserFollowers_FollowerId",
                table: "UserFollowers",
                column: "FollowerId");
        }
    }
}
