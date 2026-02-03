package builder.java.vocation;

/**
 * Builder design pattern example.
 * 
 * Reference:
 * - http://corrupt003-design-pattern.blogspot.com/2017/01/builder-pattern.html
 *
 * Usage:
 * 1. Navigate to project root: cd
 * /Users/george/github_project/learn-design-pattern
 * 2. Compile: javac builder/java/vocation/*.java
 * 3. Run: java builder.java.vocation.BuilderMain
 */
public class BuilderMain {

  public static void main(String[] args) {

    ThreeDayVocationBuilder threeDayVocationBuilder = new ThreeDayVocationBuilder();
    threeDayVocationBuilder.setBeginDate("2018/01/01")
        .setEndDate("2018/01/03")
        .setHotel(new Hotel())
        .setRestaurant(new Restaurant())
        .setTicket(java.util.Arrays.asList("Disney", "Universal"))
        .create();

    System.out.println(threeDayVocationBuilder.toString());
  }
}
